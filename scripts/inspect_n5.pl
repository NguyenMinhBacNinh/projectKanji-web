use strict;
use warnings;
use utf8;
binmode STDOUT, ':utf8';
use JSON::PP;

open my $fh, '<:raw', 'kanji_full_database.json' or die $!;
my $json = do { local $/; <$fh> };
close $fh;
my $db = decode_json($json);

open my $fh2, '<:encoding(UTF-8)', 'kanji-data.js' or die $!;
my $kjs = do { local $/; <$fh2> };
close $fh2;

my ($n5_str) = $kjs =~ /N5:\s*"([^"]+)"\.split\(" "\)/;
my @n5 = split /\s+/, $n5_str;

print "Total N5 kanji: " . scalar(@n5) . "\n";
my @missing;
for my $k (@n5) {
    if (!exists $db->{$k}) {
        push @missing, $k;
    }
}
print "Missing in DB: " . join(', ', @missing) . "\n";
print "First 50 N5 kanji:\n";
for my $i (0..49) {
    print "$n5[$i] ";
}
print "\n";
