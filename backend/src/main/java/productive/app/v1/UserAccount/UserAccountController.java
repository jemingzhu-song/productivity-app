package productive.app.v1.UserAccount;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import productive.app.v1.Role.Role;

@RestController
public class UserAccountController {
    private final UserAccountService userAccountService;

    /* 
        @Autowired is used because otherwise we don't have an instance of "userService" that 
        will parsed into this UserController() constructor. The @Autowired annotation indicates
        that the "private final UserService userService;" field/value of the UserController 
        Class will be "magically instantiated" during runtime.

        Because of this, this also means that the UserService Class must be instantiated - 
        meaning it has to be a Spring Bean - indicated by a @Component or @Service notation.
        (@Component and @Service are the exact same, just named differently for semantics).

        This is Dependency Injection.
    */
    @Autowired
    public UserAccountController(UserAccountService userAccountService) {
        this.userAccountService = userAccountService;
    }

    @GetMapping("/users")
    public List<UserAccount> getAllUsers() {
        return userAccountService.getAllUserAccounts();
    }

    // @RequestBody indicates this parameter is received from a request body made to this
    // POST endpoint
    @PostMapping("/register")
    public ResponseEntity<UserAccount> registerUserAccount(@RequestBody UserAccount userAccount) {
        // ReponseEntity.created() sends a "201" response - which indicates that something was "created/saved" in the server
        // in this case, we have created a UserAccount in the server/database.
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/register").toUriString());
        return ResponseEntity.created(uri).body(userAccountService.registerUserAccount(userAccount));
    }

    // @PostMapping("/login")
    // public ResponseEntity<UserAccount> loginUserAccount(@RequestBody UserAccountLogin userAccountLogin) {
    //     // ResponseEntity.ok() sends a "200" response
    //     return ResponseEntity.ok().body(userAccountService.loginUserAccount(userAccountLogin));
    // }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader != null) {
            try {
                String refreshToken = authorizationHeader;
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refreshToken);
                String username = decodedJWT.getSubject();
                UserAccount userAccount = userAccountService.findUserAccountByEmail(username);
                String accessToken = JWT.create().withSubject(userAccount.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .withIssuer(request.getRequestURI().toString())
                .withClaim("roles", userAccount.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                .sign(algorithm);
                HashMap<String, String> tokens = new HashMap<>();
                tokens.put("accessToken", accessToken);
                tokens.put("refreshToken", refreshToken);
                response.setContentType("application/json");
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } catch (Exception exception) {
                System.out.println("Error logging in: {}" + exception.getMessage());
                response.setHeader("error", exception.getMessage());
                // response.sendError(HttpStatus.FORBIDDEN.value());
                HashMap<String, String> error = new HashMap<>();
                error.put("errorMessage", exception.getMessage());
                response.setContentType("application/json");
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }


    // @RequestParam - to use parameters, (e.g. /edit/2?firstName=john&?email="john@gmail.com") specified
    // in the URL, use @RequestParam(required = false/true) in the input to the function
    @PutMapping("/user/edit/{userId}")
    public void updateUserAccount(@PathVariable("userId") Long userId, 
    @RequestParam(required = false) String firstName,
    @RequestParam(required = false) String lastName,
    @RequestParam(required = false) String email,
    @RequestParam(required = false) String password) {
        userAccountService.updateUserAccount(userId, firstName, lastName, email, password);
    }

    // @PathVariable: https://www.baeldung.com/spring-pathvariable
    // The curley bracket {} annotation in the path indicates a Path Variable.
    // @PathVariable allows you to take a variable specified in curley brackets from
    // the path and pass it into your function to be used
    @DeleteMapping("/user/delete/{userId}")
    public void deleteUserAccount(@PathVariable("userId") Long id) {
        userAccountService.deleteUserAccount(id);
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role>saveRole(@RequestBody Role role) {
        // ReponseEntity.created() sends a "201" response - which indicates that something was "created/saved" in the server
        // in this case, we have created a Role in the server/database.
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/role/save").toUriString());       
        return ResponseEntity.created(uri).body(userAccountService.saveRole(role));
    }

    // Add a Role to a User
    @PostMapping("/role/add")
    public ResponseEntity<UserAccount>addRoleUserAccount(@RequestBody UserAccountAddRole userAccountAddRole) {
        userAccountService.addRoleToUserAccount(userAccountAddRole.getEmail(), userAccountAddRole.getRoleName());
        return ResponseEntity.ok().build();
    }
}