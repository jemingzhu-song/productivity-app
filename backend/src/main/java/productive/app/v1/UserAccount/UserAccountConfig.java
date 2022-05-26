package productive.app.v1.UserAccount;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import productive.app.v1.Role.Role;

@Configuration
public class UserAccountConfig {
    // Run any commands before initialisation of database
    @Bean
    CommandLineRunner commandLineRunner(UserAccountService userAccountService) {
        return args -> {
            userAccountService.saveRole(new Role(null, "ROLE_USER"));
            userAccountService.saveRole(new Role(null, "ROLE_ADMIN"));
            UserAccount user1 = new UserAccount("Jeming", "Zhu-Song", "jeming@gmail.com", "password", new ArrayList<>());
            userAccountService.registerUserAccount(user1);
            userAccountService.addRoleToUserAccount("jeming@gmail.com", "ROLE_USER");
            
        };
    }
}
