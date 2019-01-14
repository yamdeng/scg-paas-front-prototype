import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

@withRouter
@inject('appStore')
@observer
class FooterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayMenu: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {
    this.props.appStore.changeHeadTitle('하단 선택 영역');
  }

  toggleMenu() {
    this.setState({
      displayMenu: !this.state.displayMenu
    });
  }

  render() {
    let displayMenu = this.state.displayMenu;
    let bottomMeunStyle = { position: 'fixed', bottom: 0, width: '100%' };
    if (!displayMenu) {
      bottomMeunStyle.display = 'none';
    }

    return (
      <React.Fragment>
        <div onClick={this.toggleMenu}>하단 선택 영역</div>
        <div style={bottomMeunStyle}>
          <Button color="primary" size="lg" block>
            메뉴1
          </Button>
          <Button color="secondary" size="lg" block style={{ margin: 0 }}>
            메뉴2
          </Button>
          <Button color="secondary" size="lg" block style={{ margin: 0 }}>
            메뉴3
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default FooterSelect;
