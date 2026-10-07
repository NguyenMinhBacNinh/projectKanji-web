use strict;
use warnings;
use utf8;
binmode STDOUT, ':utf8';
use JSON::PP;

open my $fh, '<:raw', 'kanji_full_database.json' or die $!;
local $/;
my $content = <$fh>;
close $fh;

my $db = decode_json($content);
my @sample = ('一', '二', '日', '月', '木', '金', '土', '何', '私', '学', '校');
for my $k (@sample) {
    if (exists $db->{$k}) {
        print "$k: " . encode_json($db->{$k}{example} // {}) . "\n";
    }
}
