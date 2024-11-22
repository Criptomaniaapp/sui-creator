import { FC } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          "&:before": {
            display: "none",
          },
        },
      },
    },
  },
});

export const FAQ: FC = () => {
  return (
    <div className="flex flex-col md:flex-row space-x-4 mt-5">
      <div className="flex-1 border rounded-lg border-blue-500 p-4">
        <ThemeProvider theme={theme}>
          <div className="text-2xl font-semibold text-blue-500 text-center">
          Burn LP(liquidity Pool)
        </div>
        <div className="text-base font-medium text-white mt-5">
          is a strategy used in DeFi to reduce the supply of LP tokens, increase their value, demonstrate long-term commitment 
          and reduce the risk of rug pulls, decrease the volatility of the token pair and build trust in a project.
        </div>
        <br/>
          <Typography className="text-white px-4 text-center">
            Frequently Asked Questions
          </Typography>
          <Accordion style={{ backgroundColor: "rgb(36 45 75" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography className="text-white">What is Burn Liquidity Pool?</Typography>
            </AccordionSummary>
            <AccordionDetails className="text-white">
              Burn LP is the process of removing tokens from circulation to reduce the total supply. 
              This is often done by sending tokens to an inaccessible address, effectively removing them from circulation. 
              The goal is to increase the value of the remaining tokens by reducing the available quantity.
            </AccordionDetails>
          </Accordion>
          <Accordion style={{ backgroundColor: "rgb(36 45 75" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography className="text-white">Which wallet can I use?</Typography>
            </AccordionSummary>
            <AccordionDetails className="text-white">
              You can use any Solana Wallet as Phantom, Solflare, etc.
            </AccordionDetails>
          </Accordion>
          <Accordion style={{ backgroundColor: "rgb(36 45 75" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className="text-white" />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography className="text-white">Is it Safe to Burn LP here?</Typography>
            </AccordionSummary>
            <AccordionDetails className="text-white">
              Yes, our tool is completely secure. It is a smart contract that burns LP for you, it has no access to you.
              In addition, you provide greater security to your holders by burning the LP of your token.
            </AccordionDetails>
          </Accordion>
        </ThemeProvider>
      </div>
      <div className="flex-1 border rounded-lg border-blue-500 p-4 mt-4 md:mt-0">
        <video width="100%" height="200" controls>
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
