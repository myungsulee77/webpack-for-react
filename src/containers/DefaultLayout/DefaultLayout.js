import React, { Component, Suspense } from 'react';

// sidebar nav config
//import navigation from '../../_nav';
// routes config
//import routes from '../../routes';

import classNames from 'classnames/bind';
import styles from '../../App.scss';

const cx = classNames.bind(styles);


class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }
   constructor(props) {
      super(props);

      this.state={};

    }
  render() {

    return (
      <div className={cx('SassComponent')}>
            <div className={cx('box', 'red')}/>
            <div className={cx('box', 'orange')}  />
            <div className="box yellow" />
            <div className="box green" />
            <div className="box blue" />
            <div className="box indigo" />
            <div className="box violet" />
            <i className={cx('flag-icon', 'flag-icon-ad')} title="ad" id="ad"></i>
                <div>flag-icon-ad</div>
            <i className="flag-icon flag-icon-ae h1" title="ae" id="ae"></i>
              <div>flag-icon-ae</div>

      </div>

    );
  }
}

export default DefaultLayout;
