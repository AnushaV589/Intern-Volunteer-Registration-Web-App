package com.registration.repository;

import com.registration.entity.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    
    // Find by email (for uniqueness check)
    Optional<Applicant> findByEmail(String email);
    
    // Check if email exists
    boolean existsByEmail(String email);
    
    // Find by position type
    List<Applicant> findByPositionTypeContainingIgnoreCase(String positionType);
    
    // Find by experience level
    List<Applicant> findByExperienceLevel(String experienceLevel);
    
    // Search by name or email
    @Query("SELECT a FROM Applicant a WHERE " +
           "LOWER(a.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(a.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Applicant> searchByNameOrEmail(@Param("searchTerm") String searchTerm);
    
    // Find all applicants ordered by creation date (newest first)
    List<Applicant> findAllByOrderByCreatedAtDesc();
    
    // Count applicants by position type
    @Query("SELECT COUNT(a) FROM Applicant a WHERE LOWER(a.positionType) LIKE LOWER(CONCAT('%', :positionType, '%'))")
    Long countByPositionType(@Param("positionType") String positionType);
}