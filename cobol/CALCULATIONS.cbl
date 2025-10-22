00001     IDENTIFICATION DIVISION.
00002     PROGRAM-ID. PAYROLL-CALCULATIONS.
00003    *> ====================================================
00004    *> Utility module for payroll calculations
00005    *> Demonstrates Copilot generating calculation routines
00006    *> ====================================================
00007     
00008     DATA DIVISION.
00009     WORKING-STORAGE SECTION.
00010     01  WS-TAX-RATES.
00011         05  WS-FEDERAL-RATE   PIC 9V99 VALUE 0.22.
00012         05  WS-STATE-RATE     PIC 9V99 VALUE 0.05.
00013         05  WS-FICA-RATE      PIC 9V99 VALUE 0.0765.
00014     
00015     01  WS-GROSS-PAY          PIC 9(8)V99.
00016     01  WS-NET-PAY            PIC 9(8)V99.
00017     01  WS-FEDERAL-TAX        PIC 9(8)V99.
00018     01  WS-STATE-TAX          PIC 9(8)V99.
00019     01  WS-FICA-TAX           PIC 9(8)V99.
00020     01  WS-TOTAL-DEDUCTIONS   PIC 9(8)V99.
00021     
00022     PROCEDURE DIVISION.
00023     
00024    *> ====================================================
00025    *> Calculate federal tax
00026    *> ====================================================
00027     CALCULATE-FEDERAL-TAX.
00028         MULTIPLY WS-GROSS-PAY BY WS-FEDERAL-RATE
00029             GIVING WS-FEDERAL-TAX
00030         END-MULTIPLY.
00031     
00032    *> ====================================================
00033    *> Calculate state tax
00034    *> ====================================================
00035     CALCULATE-STATE-TAX.
00036         MULTIPLY WS-GROSS-PAY BY WS-STATE-RATE
00037             GIVING WS-STATE-TAX
00038         END-MULTIPLY.
00039     
00040    *> ====================================================
00041    *> Calculate FICA tax
00042    *> ====================================================
00043     CALCULATE-FICA-TAX.
00044         MULTIPLY WS-GROSS-PAY BY WS-FICA-RATE
00045             GIVING WS-FICA-TAX
00046         END-MULTIPLY.
00047     
00048    *> ====================================================
00049    *> Calculate net pay
00050    *> ====================================================
00051     CALCULATE-NET-PAY.
00052         COMPUTE WS-TOTAL-DEDUCTIONS =
00053             WS-FEDERAL-TAX + WS-STATE-TAX + WS-FICA-TAX
00054         END-COMPUTE.
00055         
00056         COMPUTE WS-NET-PAY =
00057             WS-GROSS-PAY - WS-TOTAL-DEDUCTIONS
00058         END-COMPUTE.
