<?php

namespace Mgoigfer\SpotifyTrackField;

use Illuminate\Support\Facades\DB;
use Laravel\Nova\Fields\Field;
use Laravel\Nova\Http\Requests\NovaRequest;

class SpotifyTrackField extends Field
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'nova-spotify-track-field';

    /**
     * The Spotify track attributes.
     */
    public $trackAttributes = [
        'id',
        'name',
        'artist_id',
        'artist_name',
        'duration_ms',
        'popularity',
        'preview_url',
        'first_letter',
    ];

    /**
     * Set the Spotify access token.
     *
     * @return $this
     */
    public function spotifyAccessToken()
    {
        $spotify = app()->make('SpotifyWrapper');

        $refresh_token = DB::table('spotify')
            ->where('key', 'refresh_token')->first()->value;
        $access_token = $spotify->refreshAccessToken($refresh_token);

        return $this->withMeta([
            'spotifyAccessToken' => $access_token,
        ]);
    }

    /**
     * Set the extra model attributes to be stored.
     *
     * @param  array  $extraAttributes
     *
     * @return $this
     */
    public function extraAttributes(array $extraAttributes)
    {
        return $this->withMeta([
            'extraAttributes' => $extraAttributes,
        ]);
    }

    /**
     * Hydrate the given attributes on the model based on the incoming request.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @param  string  $requestAttribute
     * @param  object  $model
     * @param  string  $attribute
     * @return void
     */
    protected function fillAttributeFromRequest(NovaRequest $request,
        $requestAttribute, $model, $attribute)
    {
        if ($request->exists($requestAttribute)) {
            $model->{$attribute} = $request[$requestAttribute];
        }

        // If the user has selected a new track...
        if ($request->exists('id')) {
            $extraAttributes = collect($this->meta['extraAttributes']);

            foreach ($this->trackAttributes as $attr) {
                if ($extraAttributes->has($attr)) {
                    $model->{$extraAttributes->get($attr)} = $request[$attr];
                }
            }
        }
    }
}
