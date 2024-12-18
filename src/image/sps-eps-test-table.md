# SPS EPS System Testing Documentation Table

| # | System | Component | Action | Command/URL | Expected Result | Actual Result | Status | Evidence |  
|---|---------|-----------|---------|-------------|-----------------|---------------|---------|-----------|
| 1 | Web Server<br>(10.72.222.30) | Server Access | Login via PuTTY<br>User: root | - | Connection successful | | □ | |
| 2 | Web Server<br>(10.72.222.30) | Web Service | Check service status | ps -ef \| grep httpd | Processes running | | □ | |
| 3 | Web Server<br>(10.72.222.30) | UI Access | Test web access | https://spsasiagscm-globaldenso.msappproxy.net/Home | Page loads correctly | | □ | |
| 4 | AIJB | System Access | Login to AIJB<br>User: admin | http://10.74.201.184:8096/aijb_web_manager/openSearchJobQueue.do | Login successful | | □ | |
| 5 | AIJB | Batch Status | Check batch status | - | Status verified (Running/Sleep/Suspended) | | □ | |
| 6 | App Server<br>(10.74.201.184) | Server Access | Login via PuTTY<br>User: root | - | Connection successful | | □ | |
| 7 | App Server<br>(10.74.201.184) | Service Status | Check ins01 service | ps -ef \| grep java \| grep ins01 | Process running | | □ | |
| 8 | App Server<br>(10.74.201.184) | Service Status | Check insbat01 service | ps -ef \| grep java \| grep insbat01 | Process running | | □ | |
| 9 | App Server<br>(10.74.201.184) | Application | Test application access | http://10.74.201.184:8096/aijb_web_manager/ | Page loads correctly | | □ | |
| 10 | REST Server<br>(10.74.201.186) | Server Access | Login via PuTTY<br>User: root | - | Connection successful | | □ | |
| 11 | REST Server<br>(10.74.201.186) | Apache Status | Check Apache service | ps -ef \| grep httpd | Apache running | | □ | |
| 12 | REST Server<br>(10.74.201.186) | Tomcat Status | Check ins01 status | ps -ef \| grep java \| grep ins01 | Process running | | □ | |
| 13 | REST Server<br>(10.74.201.186) | Tomcat Status | Check ins02 status | ps -ef \| grep java \| grep ins02 | Process running | | □ | |
| 14 | REST Server<br>(10.74.201.186) | Tomcat Status | Check ins03 status | ps -ef \| grep java \| grep ins03 | Process running | | □ | |
| 15 | REST Server<br>(10.74.201.186) | Tomcat Status | Check ins04 status | ps -ef \| grep java \| grep ins04 | Process running | | □ | |
| 16 | REST Server<br>(10.74.201.186) | ASN Detail | Test ASN access | http://10.74.201.184:8091/Home | Data displays correctly | | □ | |
| 17 | Database Server<br>(10.74.201.185) | Server Access | Login via PuTTY<br>User: root | - | Connection successful | | □ | |
| 18 | Database Server<br>(10.74.201.185) | AIJB Status | Check LogServer | ps -ef \| grep java \| grep AijbLogServer | Process running | | □ | |
| 19 | Database Server<br>(10.74.201.185) | AIJB Status | Check QueueExecuteProc | ps -ef \| grep java \| grep QueueExecuteProc | Process running | | □ | |
| 20 | Database Server<br>(10.74.201.185) | Oracle Service | Test database access | sqlplus / as sysdba | Database accessible | | □ | |
| 21 | EPS System<br>(10.74.201.192) | System Access | Login with epsis user | - | Login successful | | □ | |
| 22 | EPS System<br>(10.74.201.192) | Tomcat Service | Check service status | - | Service running | | □ | |
| 23 | EPS System<br>(10.74.201.192) | UI Access | Test web access | http://dit0024/EPS/WCOM001_Login_rev01.jsp | Page loads correctly | | □ | |
| 24 | Final Check | Verification | Check all services | - | All services running | | □ | |
| 25 | Final Check | Logs | Check error logs | - | No error messages | | □ | |
| 26 | Final Check | User Access | Verify end user access | - | System accessible | | □ | |
| 27 | Final Check | Notification | Update stakeholders | - | Team notified | | □ | |

## Test Information
- Test Date: ________________
- Tester Name: ________________
- Start Time: ________________
- End Time: ________________

## Issues Found
| # | Issue Description | Severity | Impact | Action Taken | Status |
|---|------------------|----------|---------|--------------|---------|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |

## Sign-off
| Role | Name | Date | Signature |
|------|------|------|-----------|
| Tester | | | |
| Reviewer | | | |
