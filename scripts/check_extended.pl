use strict;
use warnings;
use utf8;
binmode STDOUT, ':utf8';

open my $fh, '<:encoding(UTF-8)', 'index.html' or die $!;
my $content = do { local $/; <$fh> };
close $fh;

my @kanjis;
while ($content =~ /"([^"]+)"\s*:\s*\{\s*hanViet\s*:/g) {
    push @kanjis, $1;
}

print "Count in KANJI_EXTENDED_DICT: " . scalar(@kanjis) . "\n";
print "Kanji: " . join(' ', @kanjis) . "\n";
