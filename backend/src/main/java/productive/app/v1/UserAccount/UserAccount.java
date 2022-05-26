package productive.app.v1.UserAccount;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.*;

import productive.app.v1.Role.Role;

@Entity // For Hibernate
@Table  // References the Table in the Database
public class UserAccount {
    // Part of Spring Data JPA
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // Putting an "@Transient" above any field/value will indicate that the field/value
    // will not be stored in the database as a column in a table.
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

    public UserAccount() {
    }

    public UserAccount(String firstName, String lastName, String email, String password, Collection<Role> roles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }
}
