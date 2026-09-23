import Sidebar from "../components/Sidebar";
import ProgressBar from "../components/ProgressBar";
import Hero from "../components/Hero";
import CodeBlock from "../components/CodeBlock";
import Reveal from "../components/Reveal";
import HttpReveal from "../components/HttpReveal";
import RequestSandbox from "../components/RequestSandbox";

const code = `// A backend is just code that answers requests
function handleRequest(req) {
  if (req.path === "/hello") {
    return { status: 200, body: "Hello from the backend!" };
  }
  return { status: 404, body: "Not found" };
}

console.log(handleRequest({ path: "/hello" }));
console.log(handleRequest({ path: "/nope" }));`;

function Box({ children, className = "" }) {
  return <div className={`rounded-xl border-[3px] border-ink bg-[#fffdf9] ${className}`}>{children}</div>;
}

function Arrow() {
  return <span className="font-mono text-5xl font-bold text-ink/80">→</span>;
}

const steps = [
  {
    pill: "Step 1",
    title: "You click something",
    text: (
      <>
        Everything you can see and touch — buttons, forms, pages — is the <b>frontend</b>. But a button on its own can&apos;t remember who you are or fetch your data.
      </>
    ),
  },
  {
    pill: "Step 2",
    title: "A request travels out",
    text: (
      <>
        Your browser sends a message over the internet to another computer — a <b>server</b> — asking for something. That message is called an HTTP request.
      </>
    ),
  },
  {
    pill: "Step 3",
    title: "The backend does the work",
    text: (
      <>
        The backend checks who you are, applies the rules, and reads or writes data in a <b>database</b>. All of this happens on a machine you never see.
      </>
    ),
  },
  {
    pill: "Step 4",
    title: "A response comes back",
    text: (
      <>
        The server sends back an answer — usually data as JSON or a page as HTML — and the frontend turns it into what you see on screen.
      </>
    ),
  },
  {
    pill: "Every app",
    title: "Backend is everywhere",
    dot: "bg-amber",
    text: (
      <>
        Logging in, paying, posting, searching — behind every one of those is a backend answering requests. That&apos;s what you&apos;re about to learn to build.
      </>
    ),
  },
];

const httpSteps = [
  {
    pill: "Step 1",
    title: "It starts with a request line",
    dot: "bg-[#5b8def]",
    text: (
      <>
        Every request begins with a <b>method</b> (what you want to do) and a <b>path</b> (where). <b>GET</b> means
        &quot;give me something&quot;.
      </>
    ),
  },
  {
    pill: "Step 2",
    title: "Headers add the details",
    dot: "bg-[#5b8def]",
    text: (
      <>
        <b>Headers</b> are labelled notes attached to the message: who you&apos;re talking to, and what format you can
        read back.
      </>
    ),
  },
  {
    pill: "Step 3",
    title: "POST carries a body",
    dot: "bg-[#5b8def]",
    text: (
      <>
        To send data <i>to</i> the server, like a new profile, use <b>POST</b> and put the data in the <b>body</b>,
        usually as JSON.
      </>
    ),
  },
  {
    pill: "Step 4",
    title: "The server replies with a status",
    dot: "bg-[#5b8def]",
    text: (
      <>
        The response has the same shape: a <b>status code</b>, headers, and a body. <b>200</b> means it worked.
      </>
    ),
  },
  {
    pill: "Step 5",
    title: "Status codes tell the story",
    dot: "bg-amber",
    text: (
      <>
        <b>2xx</b> success, <b>4xx</b> you asked wrong (404: nothing there), <b>5xx</b> the server broke. Learn these
        three and you can debug half the web.
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      <ProgressBar />
      <Sidebar />
      <main className="main-shift">
        <Hero />

        <section id="what-is-backend" className="border-b-2 border-ink bg-[#fff5f3] px-8 py-24">
          <div className="mx-auto max-w-[1100px]">
            <span className="inline-block rounded-lg border-[3px] border-ink bg-[#ef7370] px-4 py-1.5 font-mono text-xl font-bold text-[#5a1614]">
              Chapter 01
            </span>
            <h2 className="mt-6 font-display text-6xl font-extrabold md:text-8xl">What is Backend?</h2>
            <p className="mt-6 max-w-[900px] text-3xl leading-snug text-ink/80">
              The part of every app you never see — where data lives, rules run, and requests get answered. Buckle up.
            </p>

            <div className="mt-12">
              <Reveal steps={steps} />
            </div>

            <div className="mt-20 flex flex-col items-center gap-6 md:flex-row md:justify-center">
              <div className="card w-full max-w-[520px] p-7">
                <div className="flex items-center gap-2 font-display text-3xl font-extrabold">
                  Frontend
                  <span className="rounded-full bg-[#dff5e8] px-3 py-1 font-mono text-base font-normal text-[#1e7a46]">
                    what you see
                  </span>
                </div>
                <Box className="mt-3 overflow-hidden">
                  <div className="flex gap-1.5 border-b-[3px] border-ink bg-[#e8e2d6] px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/40" />
                  </div>
                  <div className="flex flex-col items-center gap-3 px-5 py-12 text-center">
                    <span className="rounded-lg border-2 border-ink bg-amber px-6 py-2 text-xl font-bold">Buy now</span>
                    <span className="text-xl text-ink/75">buttons, pages, animations</span>
                  </div>
                </Box>
              </div>

              <Arrow />

              <div className="card w-full max-w-[520px] p-7">
                <div className="flex items-center gap-2 font-display text-3xl font-extrabold">
                  Backend
                  <span className="rounded-full bg-[#fbe0e0] px-3 py-1 font-mono text-base font-normal text-[#a3211f]">
                    what it needs
                  </span>
                </div>
                <Box className="mt-3 overflow-hidden">
                  <div className="flex gap-1.5 border-b-[3px] border-ink bg-[#e8e2d6] px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ink/40" />
                  </div>
                  <div className="flex flex-col items-center gap-3 px-5 py-12 text-center">
                    <span className="rounded-lg border-2 border-ink bg-[#eaf1ff] px-5 py-2 font-mono text-lg font-bold">
                      check stock → charge card
                    </span>
                    <span className="text-xl text-ink/75">logic, data, security</span>
                  </div>
                </Box>
              </div>
            </div>

            <div className="mx-auto mt-20 max-w-[1100px]">
              <p className="mb-6 text-3xl leading-snug text-ink/80">
                A backend is just code that receives a request and returns a response. Run this tiny one:
              </p>
              <CodeBlock filename="server.js" code={code} />
            </div>
          </div>
        </section>
        <section id="client-server-http" className="border-b-2 border-ink bg-[#f2f6fe] px-8 py-24">
          <div className="mx-auto max-w-[1100px]">
            <span className="inline-block rounded-lg border-[3px] border-ink bg-[#5b8def] px-4 py-1.5 font-mono text-xl font-bold text-[#0f2a5c]">
              Chapter 02
            </span>
            <h2 className="mt-6 font-display text-6xl font-extrabold md:text-8xl">Client, Server &amp; HTTP</h2>
            <p className="mt-6 max-w-[900px] text-3xl leading-snug text-ink/80">
              Every request and response is just structured text. Let&apos;s open one up.
            </p>

            <div className="mt-12">
              <HttpReveal steps={httpSteps} />
            </div>

            <div className="mt-20">
              <p className="mb-6 text-3xl leading-snug text-ink/80">Now you&apos;re the client. Pick a request and send it:</p>
              <RequestSandbox />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
