/**
 * BlockRSS block resided inside a Scenes or timeline
 * @class BlockRSS
 * @extends Block
 * @constructor
 * @param {string} i_placement location where objects resides which can be scene or timeline
 * @param {string} i_campaign_timeline_chanel_player_id required and set as block id when block is inserted onto timeline_channel
 * @return {Object} Block instance
 */
define(['jquery', 'backbone', 'Block'], function ($, Backbone, Block) {

    var BlockRSS = Block.extend({

        /**
         Constructor
         @method initialize
         **/
        constructor: function (options) {
            Block.prototype.constructor.call(this, options);
            var self = this;
            self.m_blockType = 3345;
            self.m_blockName = BB.JalapenoHelper.getBlockBoilerplate(self.m_blockType).name;
            self.m_blockDescription = BB.JalapenoHelper.getBlockBoilerplate(self.m_blockType).description;
            self.m_blockIcon = BB.JalapenoHelper.getBlockBoilerplate(self.m_blockType).icon;
            self.m_property.initSubPanel(Elements.BLOCK_RSS_COMMON_PROPERTIES);
            self._listenInputChange();
        },

            /**
             When user changes a URL link for the feed, update the msdb
             @method _listenInputChange
             @return none
             **/
            _listenInputChange: function () {
                var self = this;
                var onChange = _.debounce(function (e) {
                    if (!self.m_selected)
                        return;
                    var text = $(e.target).val();
                    var domPlayerData = self._getBlockPlayerData();
                    var xSnippet = $(domPlayerData).find('Rss');
                    $(xSnippet).attr('url', text);
                    self._updatePlayerData(domPlayerData);
                    // log(xSnippet[0].outerHTML);
                }, 150);
                self.m_inputChangeHandler = $(Elements.RSS_LINK).on("input", onChange);
            },

        /**
         Load up property values in the common panel
         @method _populate
         @return none
         **/
        _populate: function () {
            var self = this;
            var domPlayerData = self._getBlockPlayerData();
            var xSnippet = $(domPlayerData).find('Rss');
            var url = xSnippet.attr('url');
            $(Elements.RSS_LINK).val(url);
        },

        /**
         Populate the RSS block common properties panel
         @method _loadBlockSpecificProps
         @return none
         **/
        _loadBlockSpecificProps: function () {
            var self = this;
            self._populate();
            this.m_property.viewSubPanel(Elements.BLOCK_RSS_COMMON_PROPERTIES);
        },

        /**
         Delete this block
         @method deleteBlock
         @return none
         **/
        deleteBlock: function () {
            var self = this;
            $(Elements.RSS_LINK).off('change', self.m_inputChangeHandler);
            self._deleteBlock();
        }

    });

    return BlockRSS;
});