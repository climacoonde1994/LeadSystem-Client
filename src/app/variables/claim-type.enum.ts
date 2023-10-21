export enum ClaimType {
  Role = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
  Id = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  UserName = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
  FirstName = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
  LastName = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname',
  Email = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
  GroupSid = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/groupsid',
  Sid = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid',
  PrimaryGroupSid = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/primarygroupsid',
  Name = "name",
  RoleId = "roleId"
}
