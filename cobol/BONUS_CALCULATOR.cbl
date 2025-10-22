       IDENTIFICATION DIVISION.
       PROGRAM-ID. BONUS-CALCULATOR.
       
      * Bonus calculation system
      * See README.md DEMO 3 for step-by-step instructions.
       
       DATA DIVISION.
       WORKING-STORAGE SECTION.
       01 EMPLOYEE-RECORD.
           05 EMP-ID PIC 9(6).
           05 EMP-NAME PIC X(30).
           05 GROSS-SALARY PIC 9(8)V99.
           05 YEARS-SERVICE PIC 9(2).
           05 PERFORMANCE-RATING PIC 9.
           05 DEPARTMENT PIC X(20).
           05 IS-MANAGER PIC 9 VALUE 0.
       
       01 TENURE-BONUS PIC 9(8)V99 VALUE 0.
       01 PERFORMANCE-BONUS PIC 9(8)V99 VALUE 0.
       01 MANAGEMENT-BONUS PIC 9(8)V99 VALUE 0.
       01 TOTAL-BONUS PIC 9(8)V99 VALUE 0.
       01 MAX-BONUS-PERCENTAGE PIC 9V99 VALUE 0.25.
       01 TEMP-CALC PIC 9(10)V99.
       01 BONUS-PERCENTAGE PIC 9V99.
       
       PROCEDURE DIVISION.
       
           MAIN-PROCEDURE.
               PERFORM VALIDATE-INPUT.
               PERFORM CALCULATE-TENURE-BONUS.
               PERFORM CALCULATE-PERFORMANCE-BONUS.
               PERFORM CALCULATE-MANAGEMENT-BONUS.
               PERFORM CALCULATE-TOTAL-BONUS.
               PERFORM APPLY-MAXIMUM-CAP.
               PERFORM DISPLAY-RESULTS.
               STOP RUN.
       
           VALIDATE-INPUT.
      * TODO: Validate input - salary, years, rating, department
      
           CALCULATE-TENURE-BONUS.
      * TODO: Calculate tenure-based bonus (0-4 yrs: 2%, 5-9: 5%, etc.)
      
           CALCULATE-PERFORMANCE-BONUS.
      * TODO: Calculate performance bonus by rating (1-5)
      
           CALCULATE-MANAGEMENT-BONUS.
      * TODO: Calculate management bonus (5% if manager, +5% if executive)
      
           CALCULATE-TOTAL-BONUS.
      * TODO: Sum all bonus components
      
           APPLY-MAXIMUM-CAP.
      * TODO: Cap total bonus at 25% of gross salary
      
           DISPLAY-RESULTS.
      * TODO: Display formatted bonus calculation report.
