import * as React from "react";
import * as cn from "classnames";
import * as css from "./theme/inbox.css";
import * as iconCss from "./theme/icon.child.css";
import * as addIcon from "../../../../assets/icons/add.svg";
import { Component, Fragment } from "react";
import { Icon } from "../../../ui-kit/components/icon/icon";
import { Hr } from "../../../ui-kit/components/hr/hr";
import {
  PRIMARY_MENU_ITEMS,
  SETTINGS_MENU_ITEMS,
  PrimaryMenuItem,
  TInboxMenuItems,
  TCounts
} from "../../../../models/Inbox";

export type TInboxProps = {
  selectedItem: TInboxMenuItems;
  counts: TCounts;
  isHidden: boolean;
  onSelect: (selectedItem: TInboxMenuItems) => void;
};

export class Inbox extends Component<TInboxProps> {
  render() {
    const { selectedItem, counts, isHidden } = this.props;

    if (isHidden) {
      return null;
    }

    return (
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.title}>Inbox</div>
          <Icon source={addIcon} theme={iconCss} />
        </div>

        {PRIMARY_MENU_ITEMS.map(el => {
          const shouldRenderHr = el === PrimaryMenuItem.Teams;

          const itemTheme = cn(css.menuItem, {
            [css.menuItem__active as string]: el === selectedItem
          });

          return (
            <Fragment key={el}>
              {shouldRenderHr && <Hr />}

              <div className={itemTheme} onClick={this.handleItemSelect(el)}>
                <div className={css.cathegoryTitle}>{el}</div>
                <div className={css.count}>{counts[el]}</div>
              </div>
            </Fragment>
          );
        })}

        <Hr />

        {SETTINGS_MENU_ITEMS.map(el => {
          const itemTheme = cn(css.menuItem, {
            [css.menuItem__active as string]: el === selectedItem
          });

          return (
            <div
              className={itemTheme}
              onClick={this.handleItemSelect(el)}
              key={el}
            >
              <div className={css.cathegoryTitle}>{el}</div>
            </div>
          );
        })}
      </div>
    );
  }

  handleItemSelect = (item: TInboxMenuItems) => () => this.props.onSelect(item);
}
