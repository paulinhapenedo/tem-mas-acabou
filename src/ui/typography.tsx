export function Typography({ children }: React.PropsWithChildren) {
  return children;
}

function H1({ children }: React.PropsWithChildren) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}

function H2({ children }: React.PropsWithChildren) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
      {children}
    </h2>
  );
}

function H3({ children }: React.PropsWithChildren) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
}

function H4({ children }: React.PropsWithChildren) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

function P({ children }: React.PropsWithChildren) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

function Blockquote({ children }: React.PropsWithChildren) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}

function InlineCode({ children }: React.PropsWithChildren) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

function Lead({ children }: React.PropsWithChildren) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}

function Large({ children }: React.PropsWithChildren) {
  return <div className="text-lg font-semibold">{children}</div>;
}

function Small({ children }: React.PropsWithChildren) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}

function Muted({ children }: React.PropsWithChildren) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

Typography.H1 = H1;
Typography.H2 = H2;
Typography.H3 = H3;
Typography.H4 = H4;
Typography.P = P;
Typography.Blockquote = Blockquote;
Typography.InlineCode = InlineCode;
Typography.Lead = Lead;
Typography.Large = Large;
Typography.Small = Small;
Typography.Muted = Muted;
