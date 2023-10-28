import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Container, Tab, Tabs } from "react-bootstrap";
import { Fips186 } from "./pages/Fips186";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Container className="mt-4">
        <Tabs defaultActiveKey="config" className="mb-3">
          <Tab eventKey="config" title="FIPS-186">
            <Fips186 />
          </Tab>
          {/* TODO: complete tabs */}
        </Tabs>
      </Container>
    </QueryClientProvider>
  );
}
