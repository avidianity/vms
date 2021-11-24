<?php

namespace Tests\Unit;

use App\Models\Announcement;
use App\Services\HTMLService;
use PHPUnit\Framework\TestCase;

class AnnouncementHTMLUnitTest extends TestCase
{
    /**
     * @test
     */
    public function it_strips_html_from_an_announcement_description()
    {
        $html = <<<HTML
<html>
    <head>
        <title>My Title</title>
    </head>
    <body>
        <div>Hello World</div>
        <script>console.log('Hello World! :)')</script>
        <script>alert('Mwehehehe')</script>
    </body>
</html>
HTML;

        $service = app(HTMLService::class);
        $announcement = new Announcement(['title' => 'title', 'description' => $html]);
        $this->assertFalse($service->hasTag($announcement->description, 'script'));
    }
}
