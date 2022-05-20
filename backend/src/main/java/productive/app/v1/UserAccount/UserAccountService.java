package productive.app.v1.UserAccount;

import org.springframework.beans.factory.annotation.Autowired;
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

    public void createUserAccount(UserAccount userAccount) {
        // Custom function defined by UserAccountRepository
        Optional<UserAccount> userAccountEmail = userAccountRepository.searchUserAccountByEmail(userAccount.getEmail());
        if (userAccountEmail.isPresent()) {
            throw new IllegalStateException("Email Exists!");
        }
        // Save the User Account to the database (by using userAccountRepository to interact with DB)
        userAccountRepository.save(userAccount);
    }

    // @Transactional allows us to update values in our database using "getters" and "setters" in Java, rather than implementing
    // an @Query SQL statement to make the update
    @Transactional
    public void updateUserAccount(Long userId, String firstName, String lastName, String email, String password) {
        // Check user exists
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
}
