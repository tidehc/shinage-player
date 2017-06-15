/**
 * Created by michaelzapf on 11.06.17.
 */

function PresentationLoader() {
    this.currentUrl = '';
    this.currentLastModified = 0;

    this.check = function() {
        $.ajax('/current', {
            method: 'get',
            dataType: 'json',
            success: $.proxy(function(data) {
                if (data.lastModified == undefined || data.url == undefined) {
                    return;
                }

                if (this.currentUrl == data.url && this.currentLastModified == data.lastModified) {
                    return;
                }

                this.currentUrl = data.url;
                this.currentLastModified = data.lastModified;
                this.load(this.currentUrl);
            }, this)
        });
        setTimeout($.proxy(this.check, this), 10000);
    };

    this.load = function(url) {
        $.ajax(url, {
            method: 'get',
            dataType: 'json',
            success: $.proxy(function(data) {
                this.clear();

                var pres = new Presentation();
                keyboardHandler.presentation = pres;
                pres.container = $('#canvas');
                pres.load(data);
            }, this)
        });
    };

    this.clear = function () {
        $('#canvas').empty();
    }
}