package productive.app.v1.UserAccount;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

// This interface is responsible for data access - i.e. interacting with the database
@Repository
// <Long> because that is the data type for the ID of a UserAccount Class.
// JpaRepository extends PagingAndSortingRepository, which extends CrudRepository
// JpaRepository Methods: https://docs.spring.io/spring-data/jpa/docs/current/api/org/springframework/data/jpa/repository/JpaRepository.html
// PagingAndSortingRepository Methods: https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/PagingAndSortingRepository.html
// CrudRepository Methods: https://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    /*
    This defines a custom function for JPARepository which will find a user account by the email.
    This must contain: "find" and "by" as defined by the default JPARepository method: findAllById() 
    This custom method will translate to the query: "SELECT userAccount FROM tableName WHERE userAccount.email = $1"
    */
    /* Optional<UserAccount> findUserAccountByEmail(String email); */
    
    /*
    Another way to define the above function by yourself (without relying on JPARepository's custom function)
    is to use the @Query annotation. In this case, we do: "SELECT *" to get the entire "UserAccount" object.
    Learn more here: https://www.baeldung.com/spring-data-jpa-query
    */
    @Query(value = "SELECT * FROM user_account u WHERE u.email = ?1", nativeQuery = true)
    Optional<UserAccount> searchUserAccountByEmail(String email);
}
