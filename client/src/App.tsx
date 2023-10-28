import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container, Tab, Tabs } from "react-bootstrap";
import { Fips186 } from "./pages/Fips186";
import { Ansix917 } from "./pages/Ansix917";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container className="mt-4">
        <Tabs defaultActiveKey="fips186" className="mb-3">
          <Tab eventKey="fips186" title="FIPS-186">
            <Fips186 />
          </Tab>
          <Tab eventKey="ansix917" title="ANSI X9.17">
            <Ansix917 />
          </Tab>
          {/* TODO: complete tabs */}
        </Tabs>
      </Container>
    </QueryClientProvider>
  );
}
