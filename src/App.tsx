import React from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from "./store";
import {EventList} from "./components/EventList.tsx";
import {EventsAppBar} from "./components/EventsAppBar.tsx";
import {getClientSettingByClientId} from "./services/settingService.ts";
import {addSettings} from "./store/reducers/clientSettingSlice.ts";
import Container from "@mui/material/Container";

// const clientId = generateClientId()

function App() {
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        getClientSettingByClientId(529316)
            .then(setting => {
                dispatch(addSettings(setting))
            })
    }, [dispatch])

  return (
      <>
          <EventsAppBar />

          <Container style={{ marginTop: 20 }}>
              <div>
                  <EventList />
              </div>
          </Container>
      </>
  );
}

export default App;
