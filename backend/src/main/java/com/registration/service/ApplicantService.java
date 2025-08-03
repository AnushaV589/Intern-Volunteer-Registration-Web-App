package com.registration.service;

import com.registration.dto.ApplicantDto;
import com.registration.entity.Applicant;
import com.registration.exception.ResourceNotFoundException;
import com.registration.exception.DuplicateResourceException;
import com.registration.repository.ApplicantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ApplicantService {
    
    private final ApplicantRepository applicantRepository;
    
    // Create new applicant
    public ApplicantDto createApplicant(ApplicantDto applicantDto) {
        log.info("Creating new applicant with email: {}", applicantDto.getEmail());
        
        // Check if email already exists
        if (applicantRepository.existsByEmail(applicantDto.getEmail())) {
            log.warn("Attempt to create applicant with existing email: {}", applicantDto.getEmail());
            throw new DuplicateResourceException("An application with this email already exists");
        }
        
        Applicant applicant = convertToEntity(applicantDto);
        Applicant savedApplicant = applicantRepository.save(applicant);
        
        log.info("Successfully created applicant with ID: {}", savedApplicant.getId());
        return convertToDto(savedApplicant);
    }
    
    // Get all applicants
    @Transactional(readOnly = true)
    public List<ApplicantDto> getAllApplicants() {
        log.info("Fetching all applicants");
        List<Applicant> applicants = applicantRepository.findAllByOrderByCreatedAtDesc();
        return applicants.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    // Get applicant by ID
    @Transactional(readOnly = true)
    public ApplicantDto getApplicantById(Long id) {
        log.info("Fetching applicant with ID: {}", id);
        Applicant applicant = applicantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Applicant not found with ID: " + id));
        return convertToDto(applicant);
    }
    
    // Search applicants
    @Transactional(readOnly = true)
    public List<ApplicantDto> searchApplicants(String searchTerm) {
        log.info("Searching applicants with term: {}", searchTerm);
        List<Applicant> applicants = applicantRepository.searchByNameOrEmail(searchTerm);
        return applicants.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    // Get applicants by position type
    @Transactional(readOnly = true)
    public List<ApplicantDto> getApplicantsByPositionType(String positionType) {
        log.info("Fetching applicants by position type: {}", positionType);
        List<Applicant> applicants = applicantRepository.findByPositionTypeContainingIgnoreCase(positionType);
        return applicants.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    // Update applicant
    public ApplicantDto updateApplicant(Long id, ApplicantDto applicantDto) {
        log.info("Updating applicant with ID: {}", id);
        
        Applicant existingApplicant = applicantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Applicant not found with ID: " + id));
        
        // Check if email is being changed and if new email already exists
        if (!existingApplicant.getEmail().equals(applicantDto.getEmail()) &&
            applicantRepository.existsByEmail(applicantDto.getEmail())) {
            throw new DuplicateResourceException("An application with this email already exists");
        }
        
        // Update fields
        existingApplicant.setFirstName(applicantDto.getFirstName());
        existingApplicant.setLastName(applicantDto.getLastName());
        existingApplicant.setEmail(applicantDto.getEmail());
        existingApplicant.setPhone(applicantDto.getPhone());
        existingApplicant.setPositionType(applicantDto.getPositionType());
        existingApplicant.setExperienceLevel(applicantDto.getExperienceLevel());
        
        Applicant updatedApplicant = applicantRepository.save(existingApplicant);
        log.info("Successfully updated applicant with ID: {}", id);
        
        return convertToDto(updatedApplicant);
    }
    
    // Delete applicant
    public void deleteApplicant(Long id) {
        log.info("Deleting applicant with ID: {}", id);
        
        if (!applicantRepository.existsById(id)) {
            throw new ResourceNotFoundException("Applicant not found with ID: " + id);
        }
        
        applicantRepository.deleteById(id);
        log.info("Successfully deleted applicant with ID: {}", id);
    }
    
    // Get statistics
    @Transactional(readOnly = true)
    public Object getStatistics() {
        log.info("Fetching applicant statistics");
        
        long totalApplicants = applicantRepository.count();
        long internshipCount = applicantRepository.countByPositionType("internship");
        long volunteerCount = applicantRepository.countByPositionType("volunteer");
        
        return new Object() {
            public final long total = totalApplicants;
            public final long internships = internshipCount;
            public final long volunteers = volunteerCount;
        };
    }
    
    // Helper methods for conversion
    private ApplicantDto convertToDto(Applicant applicant) {
        ApplicantDto dto = new ApplicantDto();
        dto.setId(applicant.getId());
        dto.setFirstName(applicant.getFirstName());
        dto.setLastName(applicant.getLastName());
        dto.setEmail(applicant.getEmail());
        dto.setPhone(applicant.getPhone());
        dto.setPositionType(applicant.getPositionType());
        dto.setExperienceLevel(applicant.getExperienceLevel());
        dto.setCreatedAt(applicant.getCreatedAt());
        dto.setUpdatedAt(applicant.getUpdatedAt());
        return dto;
    }
    
    private Applicant convertToEntity(ApplicantDto dto) {
        Applicant applicant = new Applicant();
        applicant.setFirstName(dto.getFirstName());
        applicant.setLastName(dto.getLastName());
        applicant.setEmail(dto.getEmail());
        applicant.setPhone(dto.getPhone());
        applicant.setPositionType(dto.getPositionType());
        applicant.setExperienceLevel(dto.getExperienceLevel());
        return applicant;
    }
}