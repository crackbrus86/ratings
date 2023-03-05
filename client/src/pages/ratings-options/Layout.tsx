import * as React from "react";

import * as Components from "../../components/index";
import Competitions from "./Competitions";

const Layout: React.FC = () => {
  return (
    <Components.Layout.ContentWrap>
      <Components.TabView>
        <Components.Tab title="Змагання" label="competitions">
          <Competitions />
        </Components.Tab>
      </Components.TabView>
    </Components.Layout.ContentWrap>
  );
};

export default Layout;
