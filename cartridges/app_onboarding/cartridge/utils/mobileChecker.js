module.exports = {
  isMobile: function () {
    var userAgent = request.httpHeaders.get('user-agent');
    var isMobile = userAgent.indexOf('Mobile') + 1

    return isMobile;
  }
}