       IDENTIFICATION DIVISION.
       PROGRAM-ID. PAYROLL-DEMO.
      *> ====================================================
      *> GitHub Copilot Code Suggestions Demo for COBOL
      *> Demonstrates code generation for business logic
      *> ====================================================
       
       ENVIRONMENT DIVISION.
       INPUT-OUTPUT SECTION.
       FILE-CONTROL.
           SELECT EMPLOYEE-FILE ASSIGN TO "employees.txt"
               ORGANIZATION IS LINE SEQUENTIAL.

       DATA DIVISION.
       FILE SECTION.
       FD  EMPLOYEE-FILE.
       01  EMPLOYEE-RECORD.
           05  EMP-ID              PIC 9(5).
           05  EMP-NAME            PIC X(30).
           05  EMP-DEPARTMENT      PIC X(20).
           05  EMP-SALARY          PIC 9(8)V99.
           05  EMP-HIRE-DATE       PIC 9(8).

       WORKING-STORAGE SECTION.
       01  WS-COUNTERS.
           05  WS-EMPLOYEE-COUNT   PIC 9(5) VALUE 0.
           05  WS-TOTAL-SALARY     PIC 9(10)V99 VALUE 0.
           05  WS-AVG-SALARY       PIC 9(10)V99 VALUE 0.

       01  WS-FLAGS.
           05  WS-EOF-FLAG         PIC X VALUE 'N'.
               88  END-OF-FILE      VALUE 'Y'.
           05  WS-PRINT-FLAG       PIC X VALUE 'Y'.

       01  WS-TEMP-FIELDS.
           05  WS-DEPT-COUNT       PIC 9(5).
           05  WS-CURRENT-DEPT     PIC X(20).

       PROCEDURE DIVISION.
       MAIN-PROCEDURE.
           PERFORM INITIALIZATION.
           PERFORM PROCESS-EMPLOYEES.
           PERFORM GENERATE-REPORT.
           PERFORM CLEANUP.
           STOP RUN.

      *> ====================================================
      *> Initialization
      *> ====================================================
       INITIALIZATION.
           DISPLAY "=================================".
           DISPLAY "PAYROLL REPORT SYSTEM".
           DISPLAY "GitHub Copilot Demo for COBOL".
           DISPLAY "=================================".
           DISPLAY " ".
           
           OPEN INPUT EMPLOYEE-FILE.

      *> ====================================================
      *> Process Employees
      *> ====================================================
       PROCESS-EMPLOYEES.
           PERFORM UNTIL END-OF-FILE
               READ EMPLOYEE-FILE
                   AT END
                       SET END-OF-FILE TO TRUE
                   NOT AT END
                       PERFORM PROCESS-EMPLOYEE-RECORD
               END-READ
           END-PERFORM.

      *> ====================================================
      *> Process individual employee record
      *> ====================================================
       PROCESS-EMPLOYEE-RECORD.
           ADD 1 TO WS-EMPLOYEE-COUNT.
           ADD EMP-SALARY TO WS-TOTAL-SALARY.
           
           DISPLAY "Processing: "
               EMP-ID " - "
               EMP-NAME " - "
               EMP-DEPARTMENT " - $"
               EMP-SALARY.

      *> ====================================================
      *> DEMO TODO: Calculate tax and net pay
      *> Type: COMPUTE FEDERAL-TAX = EMP-SALARY *
      *> Watch Copilot suggest the tax percentage
      *> ====================================================
       CALCULATE-DEDUCTIONS.
           COMPUTE FEDERAL-TAX = EMP-SALARY * 0.15
           END-COMPUTE.
           COMPUTE STATE-TAX = EMP-SALARY * 0.06
           END-COMPUTE.
           COMPUTE LOCAL-TAX = EMP-SALARY * 0.02
           END-COMPUTE.
           COMPUTE NET-PAY = EMP-SALARY - FEDERAL-TAX - STATE-TAX - LOCAL-TAX
           END-COMPUTE.

      *> ====================================================
      *> Generate Report
      *> ====================================================
       GENERATE-REPORT.
           DISPLAY " ".
           DISPLAY "=== PAYROLL SUMMARY REPORT ===".
           DISPLAY " ".
           
           IF WS-EMPLOYEE-COUNT > 0
               DIVIDE WS-TOTAL-SALARY BY WS-EMPLOYEE-COUNT
                   GIVING WS-AVG-SALARY
               END-DIVIDE
               
               DISPLAY "Total Employees: " WS-EMPLOYEE-COUNT
               DISPLAY "Total Salary: $" WS-TOTAL-SALARY
               DISPLAY "Average Salary: $" WS-AVG-SALARY
           ELSE
               DISPLAY "No employee records found."
           END-IF.
           
           DISPLAY " ".

      *> ====================================================
      *> Cleanup
      *> ====================================================
       CLEANUP.
           CLOSE EMPLOYEE-FILE.
           DISPLAY "Report generation completed.".
           DISPLAY " ".
