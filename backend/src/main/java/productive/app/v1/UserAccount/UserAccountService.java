package productive.app.v1.UserAccount;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import productive.app.v1.Role.Role;
import productive.app.v1.Role.RoleRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
// @Transactional allows us to update values in our database using "getters" and "setters" in Java, rather than implementing
// an @Query SQL statement to make the update
@Transactional
public class UserAccountService implements UserDetailsService {
    private final UserAccountRepository userAccountRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserAccountService(UserAccountRepository userAccountRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserAccount> getAllUserAccounts() {
        return userAccountRepository.findAll();
    }

    public UserAccount registerUserAccount(UserAccount userAccount) {
        // Custom function defined by UserAccountRepository
        Optional<UserAccount> userAccountEmail = userAccountRepository.searchUserAccountByEmail(userAccount.getEmail());
        if (userAccountEmail.isPresent()) {
            throw new IllegalStateException("Email Exists!");
        }
        // Encode the User's Password before saving in Database
        userAccount.setPassword(passwordEncoder.encode(userAccount.getPassword()));
        // Save the User Account to the database (by using userAccountRepository to interact with DB)
        return userAccountRepository.save(userAccount);
    }

    public UserAccount loginUserAccount(UserAccountLogin userAccountLogin) {
        // Check user email exists and is a valid account
        UserAccount userAccountLoggedIn = userAccountRepository.searchUserAccountByEmail(userAccountLogin.getEmail()).orElseThrow(() 
        -> new IllegalStateException("Account not found! Email not associated with an account."));;
        // Validate User's Login
        userAccountLoggedIn.setPassword(passwordEncoder.encode(userAccountLoggedIn.getPassword()));
        UserAccount validateLogin = userAccountRepository.validateUserAccountLogin(userAccountLogin.getEmail(), userAccountLogin.getPassword()).orElseThrow(() 
        -> new IllegalStateException("Password is incorrect. Try again"));
        return validateLogin;
    }

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

    // Save a Role
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    // Assign a Role to a User Account
    public void addRoleToUserAccount(String email, String roleName) {
        UserAccount userAccount = userAccountRepository.searchUserAccountByEmail(email).orElseThrow(() 
        -> new IllegalStateException("UserAccountService.addRoleToUserAccount() - User with email: " + email + " does not exist"));
        Role role = roleRepository.findByName(roleName);
        boolean result = userAccount.getRoles().add(role);
        for (Role r : userAccount.getRoles()) {
            System.out.println("Role: " + role.getName());
        }
    }

    // Find the UserAccount given an Email
    public UserAccount findUserAccountByEmail(String email) {
        UserAccount userAccount = userAccountRepository.searchUserAccountByEmail(email).orElseThrow(() 
        -> new IllegalStateException("UserAccountService.addRoleToUserAccount() - User with email: " + email + " does not exist"));
        return userAccount;        
    }

    // This method belongs to the "UserDetailsService" Class (provided by Spring Security)
    // Tutorial: 48min - 58min at: https://www.youtube.com/watch?v=VVn9OG9nfH0&t=
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("USERNAME: " + username);
        UserAccount userAccount = userAccountRepository.searchUserAccountByEmail(username).orElseThrow(() 
        -> new IllegalStateException("UserAccountService.loadUserByUsername() - User with email: " + username + " does not exist"));
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Role r : userAccount.getRoles()) {
            authorities.add(new SimpleGrantedAuthority(r.getName()));
        }
        return new User(userAccount.getEmail(), userAccount.getPassword(), authorities);
    }
}
