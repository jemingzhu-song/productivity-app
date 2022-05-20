package productive.app.v1.UserAccount;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class UserAccountConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserAccountRepository userAccountRepository) {
        return args -> {
            UserAccount user1 = new UserAccount("Jeming", "Zhu-Song", "jeming@gmail.com", "password");
            UserAccount user2 = new UserAccount("Leisl", "Khoo", "leisl@gmail.com", "password");
            userAccountRepository.saveAll(List.of(user1, user2));
        };
    }
}
