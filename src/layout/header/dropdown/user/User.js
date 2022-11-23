import React, { useState } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import urls from "../../../../api/apiConstants";
import { useSelector } from "react-redux";

const User = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);
  const user = useSelector((state) => state.user);

  const handleSignout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar
            className="sm"
            image={`${urls.baseUrl1}image/${user ? user.stu_no : "NUA213"}`}
          />
          <div className="user-info d-none d-md-block">
            <div className="user-status">{user ? user.role : "VC"}</div>
            <div className="user-name dropdown-indicator">
              {user ? user.userfull_name : "jude Lub"}
            </div>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <UserAvatar
              className="sm"
              image={`${urls.baseUrl1}image/${user ? user.stu_no : "NUA213"}`}
            />
            {/* <div className="user-avatar">
              <span>AB</span>
            </div> */}
            <div className="user-info">
              <span className="lead-text">
                {user ? user.userfull_name : "jude Lub"}
              </span>
              <span className="sub-text">
                {user ? user.email : "j@gmail.com"}
              </span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <LinkItem
              link="/user-profile-regular"
              icon="user-alt"
              onClick={toggle}
            >
              View Profile
            </LinkItem>
            <LinkItem
              link="/user-profile-setting"
              icon="setting-alt"
              onClick={toggle}
            >
              Account Setting
            </LinkItem>
            <LinkItem
              link="/user-profile-activity"
              icon="activity-alt"
              onClick={toggle}
            >
              Login Activity
            </LinkItem>
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a
              href={`${process.env.PUBLIC_URL}/auth-login`}
              onClick={handleSignout}
            >
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
