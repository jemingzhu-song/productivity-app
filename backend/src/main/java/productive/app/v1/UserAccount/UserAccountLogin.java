package productive.app.v1.UserAccount;

public class UserAccountLogin {
    private String email;
    private String password;

    public UserAccountLogin() {
    }

    public UserAccountLogin(String email, String password) {
        this.email = email;
        this.password = password;
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
}
