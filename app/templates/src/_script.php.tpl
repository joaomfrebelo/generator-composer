<?php
/**
 * MIT License
 * @license https://github.com/<%= githubAccount %>/<%= projectName %>/blob/master/LICENSE
 * Copyright (c) <%= year %> <%= authorName %>
 */
declare(strict_types=1);
 
namespace <%= namespace %>;

/**
 * The <%= className %> class
 * @author <%= authorName %>>
 * @since 1.0.0
 */
class <%= className %>
{
    /**
     * 
     * @since 1.1.0
     */
    public function __construct() 
    {
        \Logger::getLogger(\get_class($this))->debug(__METHOD__);
    }

}
