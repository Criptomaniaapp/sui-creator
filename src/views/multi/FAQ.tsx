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
          Solana Tokens Multisender
        </div>
          <div className="text-base font-medium text-white mt-5">
          If you&#39;re looking to distribute SPL tokens to a large number of recipients, 
            using a Solana Token Multisender can be a very efficient and convenient solution.
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
              <Typography className="text-white">What is Solana Token Multisender?</Typography>
            </AccordionSummary>
            <AccordionDetails className="text-white">
              is a tool or platform that allows users to send a specific type of cryptocurrency token (SPL tokens) 
              to multiple recipients on the Solana blockchain in a single transaction. This is often used for airdrops, 
              giveaways, or other mass distribution events.
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
              <Typography className="text-white">Is it Safe to Multisend Solana Tokens here?</Typography>
            </AccordionSummary>
            <AccordionDetails className="text-white">
              Yes, our tool is completely safe. It is a dApp that makes the airdrop for you to the wallets you indicate, 
              so it does not have any access to your assets. 
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
