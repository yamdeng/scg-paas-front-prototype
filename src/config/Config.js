import Constant from './Constant';

const Config = {};

// ajax timeout
Config.apiCallTimeout = 30000;

// 메시지 날짜 foramt
Config.dateDisplayFormat = 'YYYY-MM-DD hh:mm';

// 계약번호
Config.contractNo = '123123';

// 빈값일 경우 보여주는 문자
Config.defaultEmptyValue = '-';

// 기본 CompanyCode
Config.defaultCompanyCode = Constant.COMPANY_CODE_SEOUL;

export default Config;
