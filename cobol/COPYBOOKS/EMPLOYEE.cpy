       *> Employee copybook for record definition
       *> Demonstrates Copilot generating COBOL data structures
       
       01  EMPLOYEE-RECORD.
           05  EMP-ID              PIC 9(5).
           05  EMP-NAME            PIC X(30).
           05  EMP-DEPARTMENT      PIC X(20).
           05  EMP-SALARY          PIC 9(8)V99.
           05  EMP-START-DATE      PIC 9(8).
           05  EMP-STATUS          PIC X(1).
               88  ACTIVE           VALUE 'A'.
               88  INACTIVE         VALUE 'I'.
               88  RETIRED          VALUE 'R'.
