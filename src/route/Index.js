import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { RedirectAs404 } from "../utils/Utils";

import Homepage from "../pages/Homepage";

import Component from "../pages/components/Index";
import Accordian from "../pages/components/Accordions";
import Alerts from "../pages/components/Alerts";
import Avatar from "../pages/components/Avatar";
import Badges from "../pages/components/Badges";

import Buttons from "../pages/components/Buttons";
import Cards from "../pages/components/Cards";

import Dropdowns from "../pages/components/Dropdowns";

import StudentsToday from "../pages/components/studentsToday/DataTable";
import visitorsToday from "../pages/components/visitorsToday/DataTable";
import Rooms from "../pages/components/examinations/Rooms";
import ExamsTimetable from "../pages/components/Timetable/ExamsTimetable";
import ExamExemptions from "../pages/components/exemptions/ExamExemptions";
import FinanceUpload from "../pages/components/upload/FinanceUpload";
import VotersList from "../pages/components/Voting/VotersList";
import VotersListKmp from "../pages/components/Voting/VisitorsListKmp";
import AddExamsTT from "../pages/components/Timetable/AddExamTT";
import AddClassTT from "../pages/components/Timetable/AddClassTT";
import staffToday from "../pages/components/staffToday/DataTable";
import Modals from "../pages/components/Modals";
import Pagination from "../pages/components/Pagination";
import Popovers from "../pages/components/Popovers";
import Progress from "../pages/components/Progress";
import Spinner from "../pages/components/Spinner";
import Tabs from "../pages/components/Tabs";
import Toast from "../pages/components/Toast";
import Tooltips from "../pages/components/Tooltips";
import Typography from "../pages/components/Typography";

import StudentDetailsScreen from "../pages/pre-built/studentDetails/UserProfileLayout";
import UserProfileLayout from "../pages/pre-built/user-manage/UserProfileLayout";
import LectureDetails from "../pages/pre-built/invoice/UserProfileLayout";
import staffMemberDetails from "../pages/components/staffToday/UserProfileLayout";

import InvoiceList from "../pages/pre-built/invoice/InvoiceList";
import InvoiceDetails from "../pages/pre-built/invoice/InvoiceDetails";

import Constraints from "../pages/components/constraints/Contraints";
import ConstraintList from "../pages/components/constraints/ConstraintList";
import AssignInvigilator from "../pages/components/examinations/AssignInvigilator";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/studentDetails/`}
          component={StudentDetailsScreen}
        ></Route>

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/user-profile-activity/`}
          component={UserProfileLayout}
        ></Route>

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/invoice-list`}
          component={InvoiceList}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/invoice-details/:id`}
          component={InvoiceDetails}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/lecture-details/`}
          component={LectureDetails}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/lecture-details/`}
          component={LectureDetails}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/staffMemberDetails/`}
          component={staffMemberDetails}
        ></Route>

        {/*Components*/}
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components`}
          component={Component}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/accordions`}
          component={Accordian}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/alerts`}
          component={Alerts}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/avatar`}
          component={Avatar}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/badges`}
          component={Badges}
        ></Route>

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/buttons`}
          component={Buttons}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/cards`}
          component={Cards}
        ></Route>

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/dropdowns`}
          component={Dropdowns}
        ></Route>

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/modals`}
          component={Modals}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/pagination`}
          component={Pagination}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/popovers`}
          component={Popovers}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/progress`}
          component={Progress}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/spinner`}
          component={Spinner}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/tabs`}
          component={Tabs}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/toast`}
          component={Toast}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/tooltips`}
          component={Tooltips}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/typography`}
          component={Typography}
        ></Route>

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/studentsToday`}
          component={StudentsToday}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/visitorsToday`}
          component={visitorsToday}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/voters-list`}
          component={VotersList}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/voters-list-kmp`}
          component={VotersListKmp}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/add-exam-tt`}
          component={AddExamsTT}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/add-class-tt`}
          component={AddClassTT}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/staffToday`}
          component={staffToday}
        ></Route>

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/constraints`}
          component={Constraints}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/constraintsList`}
          component={ConstraintList}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/assign-inv`}
          component={AssignInvigilator}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/exam-tt`}
          component={ExamsTimetable}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/exam-exemptions`}
          component={ExamExemptions}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/finance-file-upload`}
          component={FinanceUpload}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/rooms`}
          component={Rooms}
        ></Route>

        <Route
          exact
          path={`${process.env.PUBLIC_URL}/`}
          component={Homepage}
        ></Route>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
