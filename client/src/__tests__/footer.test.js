import { render,screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Footer from "../components/Footer"; 

describe("Footer component", () => {
  it("renders the Nintendo disclaimer", () => {
    const { getByText } = render(<Footer />);
    const disclaimerText = "This website is not affiliated with Nintendo. Pokémon is a Nintendo product that we have all grown up loving, and wanted to dedicate this class project to. Please use this website at your own discretion.";
    expect(screen.getByText(disclaimerText)).toBeInTheDocument();
  });

  it("renders the creators' names", () => {
    const { getByText } = render(<Footer />);
    const creatorText = "© 💖 Created By: George Lin, Wendy Vu, Jeffrey Yeh and Madilyn Bariekman 💖";
    expect(screen.getByText(creatorText)).toBeInTheDocument();
  });
});