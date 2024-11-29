const func = require('./processor');
func({
  id: 12345,
  data: {
    from_date: '2024-11-28 00:00:00',
    to_date: '2024-11-28 15:59:59',
    is_user_initiated: true,
  },
});
