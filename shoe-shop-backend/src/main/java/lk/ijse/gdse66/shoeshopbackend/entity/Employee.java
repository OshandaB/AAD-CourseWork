package lk.ijse.gdse66.shoeshopbackend.entity;


import jakarta.persistence.*;
import lk.ijse.gdse66.shoeshopbackend.util.CivilStatus;
import lk.ijse.gdse66.shoeshopbackend.util.Gender;
import lk.ijse.gdse66.shoeshopbackend.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @Column(name = "employee_code")
    private String id;

    @Column(name = "employee_name")
    private String name;

    @Column(name = "employee_profile_pic", columnDefinition = "LONGTEXT")
    private String employeeProfilePic;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(name = "civil_status")
    private CivilStatus civilStatus;

    private String designation;

    @Enumerated(EnumType.STRING)
    @Column(name = "access_role")
    private Role accessRole;

    @Temporal(TemporalType.DATE)
    private Date dob;

    @Temporal(TemporalType.DATE)
    @Column(name = "date_of_join")
    private Date dateOfJoin;

    @Column(name = "attached_branch")
    private String attachedBranch;

    @Column(name = "address_line_01")
    private String addressLine01;

    @Column(name = "address_line_02")
    private String addressLine02;

    @Column(name = "address_line_03")
    private String addressLine03;


    @Column(name = "address_line_04")
    private String addressLine04;

    @Column(name = "address_line_05")
    private String addressLine05;

    @Column(name = "contact_no")
    private String contactNo;

    private String email;

    @Column(name = "emergency_contact")
    private String emergencyContact;

    @Column(name = "emergency_contact_person")
    private String emergencyContactPerson;
}
