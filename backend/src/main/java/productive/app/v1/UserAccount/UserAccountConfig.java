package productive.app.v1.UserAccount;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserAccountConfig {
    // Run any commands before initialisation of database
    @Bean
    CommandLineRunner commandLineRunner(UserAccountRepository userAccountRepository) {
        return args -> {
            // UserAccount user1 = new UserAccount("Jeming", "Zhu-Song", "jeming@gmail.com", "password");
            // userAccountRepository.save(user1);
        };
    }
}
