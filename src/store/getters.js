const getters = {
  user:state => state.user,
  id: state=> state.user.id,
  name: state => state.user.name,
  sex:state => state.user.sex,
  phone:state => state.user.phone,
  loc:state => state.user.loc,
  roles: state => state.user.roles,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  status: state => state.user.status,
  tempRoles: state => state.app.tempRoles,
  userSessions:state => state.chat.sessions,
  nowSession: state => state.chat.sessions.find(session => session.key === state.chat.currentSessionId),
  currentSessionId: state => state.chat.currentSessionId,
  filterKey: state => state.chat.filterKey
}
export default getters
