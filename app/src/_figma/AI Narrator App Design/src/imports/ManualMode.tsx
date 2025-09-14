function ProgramActionsBar() {
  return (
    <div className="absolute h-[60px] left-[1520px] top-0 w-[400px]" data-name="Program Actions Bar">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 60">
        <g id="Program Actions Bar">
          <rect fill="hsl(var(--primary))" height="60" width="400" />
          <circle cx="324" cy="30" fill="hsl(var(--chart-2))" id="Ellipse 1" r="15" />
          <circle cx="234" cy="30" fill="hsl(var(--destructive))" id="Ellipse 2" r="15" />
          <circle cx="279" cy="30" fill="hsl(var(--chart-4))" id="Ellipse 3" r="15" />
        </g>
      </svg>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="absolute contents left-[400px] top-0" data-name="Dashboard">
      <div className="absolute bg-primary h-[60px] left-[400px] top-0 w-[200px]" data-name="Current window">
        <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" />
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[448px] not-italic text-[20px] text-nowrap text-primary-foreground top-[18px]">
        <p className="leading-[normal] whitespace-pre">{`Dashboard `}</p>
      </div>
    </div>
  );
}

function AutoMode() {
  return (
    <div className="absolute contents left-[600px] top-0" data-name="Auto Mode">
      <div className="absolute bg-primary h-[60px] left-[600px] top-0 w-[200px]" data-name="window 2">
        <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none" />
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[648px] not-italic text-[20px] text-nowrap text-primary-foreground top-[18px]">
        <p className="leading-[normal] whitespace-pre">Auto Mode</p>
      </div>
    </div>
  );
}

function ManualMode() {
  return (
    <div className="absolute contents left-[800px] top-0" data-name="Manual Mode">
      <div className="absolute bg-background h-[60px] left-[800px] top-0 w-[200px]" data-name="window 3" />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[836px] not-italic text-muted-foreground text-[20px] text-nowrap top-[18px]">
        <p className="leading-[normal] whitespace-pre">Manual Mode</p>
      </div>
    </div>
  );
}

function TopBar() {
  return (
    <div className="absolute bg-sidebar h-[60px] left-0 overflow-clip top-0 w-[1920px]" data-name="Top Bar">
      <ProgramActionsBar />
      <div className="absolute bg-muted left-2.5 size-[45px] top-[7px]" data-name="Main Menu" />
      <Dashboard />
      <AutoMode />
      <ManualMode />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-0 top-[26px]">
      <div className="absolute bg-accent h-[100px] left-0 top-[26px] w-[400px]">
        <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none" />
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[93px] not-italic text-[20px] text-accent-foreground text-nowrap top-[57px]">
        <p className="leading-[normal] whitespace-pre">Chose Content Source</p>
      </div>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-0 top-[125px]">
      <div className="absolute bg-accent h-[100px] left-0 top-[125px] w-[400px]">
        <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-0 top-[225px]">
      <div className="absolute bg-accent h-[100px] left-0 top-[225px] w-[400px]">
        <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none" />
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[38px] not-italic text-[20px] text-accent-foreground text-nowrap top-[269px]">
        <p className="leading-[normal] whitespace-pre">{`Voice & Text-to-speech Settings`}</p>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-0 top-[325px]">
      <div className="absolute bg-accent h-[100px] left-0 top-[325px] w-[400px]">
        <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none" />
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[73px] not-italic text-[20px] text-accent-foreground text-nowrap top-[363px]">
        <p className="leading-[normal] whitespace-pre">{`Background Audio & Music`}</p>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-0 top-[524px]">
      <div className="absolute bg-accent h-[100px] left-0 top-[524px] w-[400px]">
        <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none" />
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-12 not-italic text-[20px] text-accent-foreground text-nowrap top-[562px]">
        <p className="leading-[normal] whitespace-pre">{`Audio & Video & Mixing Settings`}</p>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-[724px]">
      <div className="absolute bg-accent h-[100px] left-0 top-[724px] w-[400px]">
        <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none" />
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[170px] not-italic text-[20px] text-accent-foreground text-nowrap top-[762px]">
        <p className="leading-[normal] whitespace-pre">Result</p>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-[624px]">
      <div className="absolute bg-accent h-[100px] left-0 top-[624px] w-[400px]">
        <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none" />
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[100px] not-italic text-[20px] text-accent-foreground text-nowrap top-[662px]">
        <p className="leading-[normal] whitespace-pre">Output Configuration</p>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-0 top-[425px]">
      <div className="absolute bg-accent h-[100px] left-0 top-[425px] w-[400px]">
        <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none" />
      </div>
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[125px] not-italic text-[20px] text-accent-foreground text-nowrap top-[456px]">
        <p className="leading-[normal] whitespace-pre">Visual Elements</p>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-0 top-[425px]">
      <Group5 />
    </div>
  );
}

function LeftSidebar() {
  return (
    <div className="absolute bg-sidebar h-[1020px] left-0 overflow-clip top-[60px] w-[400px]" data-name="Left Sidebar">
      <Group9 />
      <Group8 />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-[45px] not-italic text-[20px] text-accent-foreground text-nowrap top-[175px]">
        <p className="leading-[normal] whitespace-pre">Text Cleaning And Segmentation</p>
      </div>
      <Group7 />
      <Group6 />
      <Group3 />
      <Group1 />
      <Group2 />
      <Group4 />
    </div>
  );
}

function RightSidebar() {
  return <div className="absolute bg-sidebar h-[1020px] left-[1520px] top-[60px] w-[400px]" data-name="Right Sidebar" />;
}

export default function ManualMode1() {
  return (
    <div className="bg-background relative size-full" data-name="Manual Mode">
      <TopBar />
      <LeftSidebar />
      <RightSidebar />
    </div>
  );
}