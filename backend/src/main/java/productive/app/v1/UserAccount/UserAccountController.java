package productive.app.v1.UserAccount;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "auth")
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

    @GetMapping("/all")
    public List<UserAccount> getAllUsers() {
        return userAccountService.getAllUserAccounts();
    }

    // @RequestBody indicates this parameter is received from a request body made to this
    // POST endpoint
    @PostMapping("/register")
    public void registerUserAccount(@RequestBody UserAccount userAccount) {
        userAccountService.registerUserAccount(userAccount);
    }

    @PostMapping("/login")
    public void loginUserAccount(@RequestBody UserAccountLogin userAccountLogin) {
        userAccountService.loginUserAccount(userAccountLogin);
    }

    // @RequestParam - to use parameters, (e.g. /edit/2?firstName=john&?email="john@gmail.com") specified
    // in the URL, use @RequestParam(required = false/true) in the input to the function
    @PutMapping("/edit/{userId}")
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
    @DeleteMapping("/delete/{userId}")
    public void deleteUserAccount(@PathVariable("userId") Long id) {
        userAccountService.deleteUserAccount(id);
    }
}