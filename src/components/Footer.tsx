export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border py-8 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Further. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Own the Unknown.
        </p>
      </div>
    </footer>
  );
}
