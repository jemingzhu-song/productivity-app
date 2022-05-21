package productive.app.v1.UserAccount;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
public class UserAccountService {
    private final UserAccountRepository userAccountRepository;

    @Autowired
    public UserAccountService(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    public List<UserAccount> getAllUserAccounts() {
        return userAccountRepository.findAll();
    }

    public void registerUserAccount(UserAccount userAccount) {
        // Custom function defined by UserAccountRepository
        Optional<UserAccount> userAccountEmail = userAccountRepository.searchUserAccountByEmail(userAccount.getEmail());
        if (userAccountEmail.isPresent()) {
            throw new IllegalStateException("Email Exists!");
        }
        // Save the User Account to the database (by using userAccountRepository to interact with DB)
        userAccountRepository.save(userAccount);
    }

    public void loginUserAccount(UserAccountLogin userAccountLogin) {
        // Check user email exists and is a valid account
        Optional<UserAccount> userAccountEmail = userAccountRepository.searchUserAccountByEmail(userAccountLogin.getEmail());
        if (!userAccountEmail.isPresent()) {
            throw new IllegalStateException("Account not found! Email not associated with an account.");
        }
        // Validate User's Login
        Optional<UserAccount> validateLogin = userAccountRepository.validateUserAccountLogin(userAccountLogin.getEmail(), userAccountLogin.getPassword());
        if (!validateLogin.isPresent()) {
            throw new IllegalStateException("Password is incorrect. Try again");
        }
    }

    // @Transactional allows us to update values in our database using "getters" and "setters" in Java, rather than implementing
    // an @Query SQL statement to make the update
    @Transactional
    public void updateUserAccount(Long userId, String firstName, String lastName, String email, String password) {
        // Check user exists=
        UserAccount userAccount = userAccountRepository.findById(userId).orElseThrow(() 
        -> new IllegalStateException("User with id: " + userId + "does not exist"));
        // Check which fields are being edited
        if (firstName != null) {
            userAccount.setFirstName(firstName);
        }
        if (lastName != null) {
            userAccount.setLastName(lastName);
        }
        if (email != null) {
            // Check the "new" email to be changed does not exist
            Optional<UserAccount> userAccountEmail = userAccountRepository.searchUserAccountByEmail(userAccount.getEmail());
            if (userAccountEmail.isPresent()) {
                throw new IllegalStateException("Email Exists!");
            } else {
                userAccount.setEmail(email);
            }
        }
        if (password != null) {
            userAccount.setPassword(password);
        }
    }

    public void deleteUserAccount(Long userId) {
        // This is a pre-defined function by JPA Repository, hence, it is not declared/defined in the UserAccountRepository Class
        boolean exists = userAccountRepository.existsById(userId);
        if (!exists) {
            throw new IllegalStateException("User with id: " + userId + " does not exist");
        }
        // This is a pre-defined function by JPA Repository, hence, it is not declared/defined in the UserAccountRepository Class
        userAccountRepository.deleteById(userId);
    }

    // @Override
    // public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    //     UserAccount userAccount = userAccountRepository.searchUserAccountByEmail(email).orElseThrow(() 
    //     -> new IllegalStateException("User with email: " + email + "does not exist"));
    //     return new org.springframework.security.core.userdetails.User();

    // }
}
