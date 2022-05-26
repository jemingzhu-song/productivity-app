package productive.app.v1.Security;

import org.springframework.http.HttpMethod;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import productive.app.v1.Filter.CustomAuthenticationFilter;
import productive.app.v1.Filter.CustomAuthorizationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    // This is provided by Spring Security, and implemented by UserAccountService.java Class
    private final UserDetailsService userDetailsService;
    // This bean is defined in the ProductiveApplication.java class
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public SecurityConfig(UserDetailsService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // Paths that we don't want to secure
        http.authorizeRequests().antMatchers("/login", "/register", "/token/**").permitAll();
        // Ensure any requests about a user's information: given by "/user" prefix must have a role of "user"
        http.authorizeRequests().antMatchers(HttpMethod.GET, "/user/**").hasAnyAuthority("ROLE_USER");
        // Ensure the requests sent to the paths defined above come from users that have been authenticated.
        http.authorizeRequests().anyRequest().authenticated();
        http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
        // This filter will come before all other filters - we need to intercept all requests before any other filters
        http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
    
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        // This class (SecurityConfig) extends WebSecurityConfigurerAdapter Class, which
        // has an authenticationManager() method that we can call using "super"
        return super.authenticationManager();
    }
}
