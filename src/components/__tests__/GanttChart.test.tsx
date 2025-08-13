import { render, screen } from "@testing-library/react";
import GanttChart, { GanttTask } from "../GanttChart";
import { vi } from "vitest";

describe("GanttChart", () => {
  it("renders tasks with valid dates", () => {
    const tasks: GanttTask[] = [
      { id: "1", label: "Valid", start: "2024-01-01", end: "2024-01-05" },
    ];
    render(<GanttChart tasks={tasks} />);
    expect(screen.getByText("Valid")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("skips tasks with end before start and shows alert", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const tasks: GanttTask[] = [
      { id: "1", label: "Valid", start: "2024-01-01", end: "2024-01-05" },
      { id: "2", label: "Invalid", start: "2024-02-05", end: "2024-02-01" },
    ];
    render(<GanttChart tasks={tasks} />);
    expect(screen.getByText("Valid")).toBeInTheDocument();
    expect(screen.queryByText("Invalid")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it("renders task with equal start and end", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const tasks: GanttTask[] = [
      { id: "1", label: "Equal", start: "2024-01-01", end: "2024-01-01" },
    ];
    render(<GanttChart tasks={tasks} />);
    expect(screen.getByText("Equal")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
