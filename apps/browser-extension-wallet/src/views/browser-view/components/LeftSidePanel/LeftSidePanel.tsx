import React from 'react';
import { useHistory } from 'react-router';
import { walletRoutePaths } from '@routes';
import { SideMenu } from '../SideMenu';
import { useIsSmallerScreenWidthThan } from '@hooks/useIsSmallerScreenWidthThan';
import { BREAKPOINT_XSMALL } from '@src/styles/constants';
import { NetworkPill } from '@components/NetworkPill';
import laceLogo from '@assets/branding/lace-logo.svg';
import laceLogoDarkMode from '@assets/branding/lace-logo-dark-mode.svg';
import LaceLogoMark from '@assets/branding/lace-logo-mark.component.svg';
import styles from './LeftSidePanel.module.scss';

export interface VerticalNavigationBarProps {
  theme: string;
}

const logoExtended: Record<string, string> = {
  dark: laceLogoDarkMode,
  light: laceLogo
};

export const LeftSidePanel = ({ theme }: VerticalNavigationBarProps): React.ReactElement => {
  const history = useHistory();
  const isNarrowWindow = useIsSmallerScreenWidthThan(BREAKPOINT_XSMALL);

  const handleLogoRedirection = () => history.push(walletRoutePaths.assets);

  const logo = isNarrowWindow ? (
    <LaceLogoMark className={styles.shortenedLogo} onClick={handleLogoRedirection} />
  ) : (
    <img
      className={styles.logo}
      src={logoExtended[theme]}
      alt="LACE"
      data-testid="header-logo"
      onClick={handleLogoRedirection}
    />
  );

  return (
    <nav id="nav" className={styles.navigation}>
      <div className={styles.stickyMenuInner}>
        <div className={styles.logoContainer}>
          {logo}
          {isNarrowWindow ? (
            <div className={styles.networkPillContainer}>
              <NetworkPill isExpandable />
            </div>
          ) : (
            <NetworkPill />
          )}
        </div>
        <SideMenu menuItemLabelClassName={styles.concealableMenuLabel} />
      </div>
    </nav>
  );
};