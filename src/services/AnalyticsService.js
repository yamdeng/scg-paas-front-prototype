/* global gtag */
import Config from '../config/Config';

class AnalyticsService {
  sendGA(gaInfo) {
    gtag('config', Config.AnalysticId, {
      page_title: gaInfo.page_title,
      page_path: '/' + gaInfo.page_path
    });
  }
}

export default new AnalyticsService();
