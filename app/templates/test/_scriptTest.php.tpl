<?php
/**
 * MIT License
 * @license https://github.com/<%= githubAccount %>/<%= projectName %>/blob/master/LICENSE
 * Copyright (c) <%= year %> <%= authorName %>
 */
declare(strict_types=1);
 
namespace <%= namespace %>;

use PHPUnit\Framework\TestCase;
use <%= namespace %>\<%= className %>;

class <%= className %>Test extends TestCase
{
    
    /**
    * @author <%= authorName %>
    * @test
    */
    public function testReflection(): void
    {
        (new \Rebelo\Base())->testReflection(<%= className %>::class);
        $this->assertTrue(true);
    }
    
    /**
    * @author <%= authorName %>
    * @test
    */
    public function testInstance () : void
    {
        $this->assertInstanceOf(<%= className %>::class, new <%= className %>());
    }

}
