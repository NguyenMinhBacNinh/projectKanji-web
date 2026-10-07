use strict;
use warnings;
use utf8;
binmode STDOUT, ':utf8';

open my $fh, '-|', 'git', 'diff', 'kanji_full_database.json' or die $!;
my @chars;
while (<$fh>) {
    if (/^\+\s*"([^"]+)":\s*\{/) {
        push @chars, $1;
    }
}
close $fh;

print "Diff contains " . scalar(@chars) . " kanji:\n";
print join(' ', @chars) . "\n";
print "\nDoes diff contain '父'? " . (grep { $_ eq '父' } @chars ? "YES" : "NO") . "\n";
