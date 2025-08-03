package com.registration.controller;

import com.registration.dto.ApplicantDto;
import com.registration.service.ApplicantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applicants")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:5173") // Frontend port
public class ApplicantController {

    private final ApplicantService applicantService;

    // Create new applicant
    @PostMapping
    public ResponseEntity<ApplicantDto> createApplicant(@Valid @RequestBody ApplicantDto applicantDto) {
        log.info("Creating applicant: {} {}", applicantDto.getFirstName(), applicantDto.getLastName());
        ApplicantDto createdApplicant = applicantService.createApplicant(applicantDto);
        return new ResponseEntity<>(createdApplicant, HttpStatus.CREATED);
    }

    // Get all applicants
    @GetMapping
    public ResponseEntity<List<ApplicantDto>> getAllApplicants() {
        List<ApplicantDto> applicants = applicantService.getAllApplicants();
        return ResponseEntity.ok(applicants);
    }

    // Get applicant by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApplicantDto> getApplicantById(@PathVariable Long id) {
        ApplicantDto applicant = applicantService.getApplicantById(id);
        return ResponseEntity.ok(applicant);
    }

    // Search applicants
    @GetMapping("/search")
    public ResponseEntity<List<ApplicantDto>> searchApplicants(@RequestParam String q) {
        List<ApplicantDto> applicants = applicantService.searchApplicants(q);
        return ResponseEntity.ok(applicants);
    }

    // Get applicants by position type
    @GetMapping("/position/{positionType}")
    public ResponseEntity<List<ApplicantDto>> getApplicantsByPositionType(@PathVariable String positionType) {
        List<ApplicantDto> applicants = applicantService.getApplicantsByPositionType(positionType);
        return ResponseEntity.ok(applicants);
    }

    // Update applicant
    @PutMapping("/{id}")
    public ResponseEntity<ApplicantDto> updateApplicant(
            @PathVariable Long id,
            @Valid @RequestBody ApplicantDto applicantDto) {
        ApplicantDto updatedApplicant = applicantService.updateApplicant(id, applicantDto);
        return ResponseEntity.ok(updatedApplicant);
    }

    // Delete applicant
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplicant(@PathVariable Long id) {
        applicantService.deleteApplicant(id);
        return ResponseEntity.noContent().build();
    }

    // Get statistics
    @GetMapping("/statistics")
    public ResponseEntity<Object> getStatistics() {
        Object statistics = applicantService.getStatistics();
        return ResponseEntity.ok(statistics);
    }
}
